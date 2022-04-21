import React, { FC } from "react";

import styles from "./Diagram.module.css";

interface PropsNodeView {
  title: string;
  nodeChild?: PropsNodeView[];
  defaultExpand?: boolean;
}
const NodeView: FC<PropsNodeView> = ({ title, nodeChild, defaultExpand }) => {
  const [show, setShow] = React.useState(Boolean(defaultExpand));
  return (
    <li>
      <code onClick={(e) => setShow(!show)}>{title}</code>
      {nodeChild && show && (
        <ul>
          {nodeChild.map((node, idx) => (
            <NodeView
              key={idx}
              title={node.title}
              nodeChild={node.nodeChild}
              defaultExpand={defaultExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export function generateNode(level: number): PropsNodeView {
  if (level === 0) return { title: "last child" };
  const newLevel = level - 1;
  return {
    title: "123",
    nodeChild: Array.from({ length: Math.ceil(Math.random() * 3) }).map((e) =>
      generateNode(newLevel)
    ),
  };
}
interface Props {
  node: PropsNodeView;
  defaultExpand?: boolean;
}

const LocalView: FC<Props> = ({ node, defaultExpand }) => {
  return (
    <ul className={styles.treeView}>
      <NodeView title={node.title} nodeChild={node.nodeChild} defaultExpand={defaultExpand} />
    </ul>
  );
};

export default LocalView;
