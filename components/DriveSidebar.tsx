'use client';

import { useState, useEffect } from 'react';
import { Folder, FileText, FileSpreadsheet, File, Search, ChevronDown, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { DriveNode } from '@/lib/googleDrive';
import { motion, AnimatePresence } from 'framer-motion';

export default function DriveSidebar() {
  const [root, setRoot] = useState<DriveNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DriveNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

  useEffect(() => {
    fetch('/api/drive')
      .then(res => res.json())
      .then(data => {
        setRoot(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => setSearchResults(data));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getFileIcon = (node: DriveNode) => {
    if (node.mime?.includes('spreadsheet')) return <FileSpreadsheet size={18} className="text-green-600" />;
    if (node.mime?.includes('pdf')) return <FileText size={18} className="text-red-600" />;
    if (node.mime?.includes('image')) return <ImageIcon size={18} className="text-blue-600" />;
    return <File size={18} className="text-gray-600" />;
  };

  const flattenFiles = (node: DriveNode): DriveNode[] => {
    const files: DriveNode[] = [];
    if (node.type === 'file') {
      files.push(node);
    }
    if (node.children) {
      node.children.forEach(child => files.push(...flattenFiles(child)));
    }
    return files;
  };

  const sortFiles = (files: DriveNode[]) => {
    return [...files].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        const dateA = a.modified || '';
        const dateB = b.modified || '';
        return dateB.localeCompare(dateA);
      }
    });
  };

  const displayNodes = searchTerm.trim() ? searchResults : (root?.children || []);

  if (loading) {
    return (
      <div className="h-full p-4 space-y-3">
        <div className="h-10 bg-muted rounded-xl animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-8 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSortBy('name')}
            className={`px-2 py-1 rounded ${sortBy === 'name' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            Name
          </button>
          <button
            onClick={() => setSortBy('date')}
            className={`px-2 py-1 rounded ${sortBy === 'date' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            Date
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {!searchTerm && root && (
          <div className="space-y-1">
            {root.children?.map(folder => (
              <FolderTree
                key={folder.id}
                node={folder}
                level={0}
                expanded={expandedFolders}
                onToggle={toggleFolder}
                getFileIcon={getFileIcon}
              />
            ))}
          </div>
        )}

        {searchTerm && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            {sortFiles(displayNodes.filter(n => n.type === 'file')).map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
              >
                {getFileIcon(file)}
                <span className="text-sm truncate">{file.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FolderTree({
  node,
  level,
  expanded,
  onToggle,
  getFileIcon,
}: {
  node: DriveNode;
  level: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  getFileIcon: (node: DriveNode) => React.ReactNode;
}) {
  const isExpanded = expanded.has(node.id);
  const isFolder = node.type === 'folder';

  return (
    <div>
      <div
        className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-accent"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.id);
          }
        }}
      >
        {isFolder ? (
          <>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={18} className="text-blue-600" />
          </>
        ) : (
          <>
            <span className="w-4" />
            {getFileIcon(node)}
          </>
        )}
        <span className="text-sm truncate">{node.name}</span>
      </div>
      {isFolder && isExpanded && node.children && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {node.children.map(child => (
              <FolderTree
                key={child.id}
                node={child}
                level={level + 1}
                expanded={expanded}
                onToggle={onToggle}
                getFileIcon={getFileIcon}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
