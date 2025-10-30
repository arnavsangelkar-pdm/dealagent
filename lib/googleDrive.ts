import { promises as fs } from 'fs';
import path from 'path';

export type DriveNode = {
  id: string;
  name: string;
  type?: 'folder' | 'file';
  mime?: string;
  size?: number;
  modified?: string;
  children?: DriveNode[];
};

type DriveData = {
  root: DriveNode;
};

let driveData: DriveData | null = null;

async function loadDriveData(): Promise<DriveData> {
  if (driveData) return driveData;
  
  const filePath = path.join(process.cwd(), 'data', 'mockDrive.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  driveData = JSON.parse(fileContents) as DriveData;
  return driveData;
}

export async function connect(): Promise<{ status: 'connected'; account: string }> {
  await new Promise(r => setTimeout(r, 650));
  return { status: 'connected', account: 'demo@pdm.com' };
}

export async function getRoot(): Promise<DriveNode> {
  const data = await loadDriveData();
  return data.root;
}

export async function search(term: string): Promise<DriveNode[]> {
  const data = await loadDriveData();
  const results: DriveNode[] = [];
  const searchLower = term.toLowerCase();

  function dfs(node: DriveNode) {
    if (node.name.toLowerCase().includes(searchLower)) {
      results.push(node);
    }
    if (node.children) {
      node.children.forEach(child => dfs(child));
    }
  }

  dfs(data.root);
  return results;
}

export async function getById(id: string): Promise<DriveNode | undefined> {
  const data = await loadDriveData();

  function dfs(node: DriveNode): DriveNode | undefined {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = dfs(child);
        if (found) return found;
      }
    }
    return undefined;
  }

  return dfs(data.root);
}
