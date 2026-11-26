import React, { useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface TreeNodeData {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
}

export interface TreeViewProps extends BaseComponentProps<'root' | 'node'> {
  data: TreeNodeData[];
  defaultExpandedIds?: string[];
  selectedId?: string;
  onSelect?: (node: TreeNodeData) => void;
  className?: string;
}

export function TreeView(rawProps: TreeViewProps) {
  const { props, isUnstyled, getSlotClass } = useComponentConfig('TreeView', rawProps);
  const chevronRight = useInternalGlyph('chevronRight');
  const chevronDown = useInternalGlyph('chevronDown');

  const {
    data,
    defaultExpandedIds = [],
    selectedId: controlledSelected,
    onSelect,
    className,
  } = props;

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpandedIds));
  const [internalSelected, setInternalSelected] = useState<string | undefined>();
  const selectedId = controlledSelected ?? internalSelected;

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: TreeNodeData, depth: number) => {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isExpanded = expanded.has(node.id);
    const isSelected = selectedId === node.id;

    return (
      <li key={node.id} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
        <button
          type="button"
          onClick={() => {
            if (hasChildren) toggle(node.id);
            if (controlledSelected === undefined) setInternalSelected(node.id);
            onSelect?.(node);
          }}
          data-selected={isSelected || undefined}
          data-slot="node"
          className={getSlotClass('node', 'kx-tree-node')}
          style={{ paddingLeft: `${0.5 + depth * 1.15}rem` }}
        >
          <span className="kx-icon" style={{ width: '1rem' }}>
            {hasChildren ? (isExpanded ? chevronDown : chevronRight) : null}
          </span>
          {node.icon && <span className="kx-icon">{node.icon}</span>}
          <span>{node.label}</span>
        </button>
        {hasChildren && isExpanded && (
          <ul role="group" className="kx-tree-list">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul
      role="tree"
      data-kx="tree-view"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-tree-list', className)}
    >
      {data.map((node) => renderNode(node, 0))}
    </ul>
  );
}
