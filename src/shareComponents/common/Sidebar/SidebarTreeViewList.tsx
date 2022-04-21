import React, { FC, useState } from "react";
import { NavLink, LinkProps } from "react-router-dom";

import IconFolder from "../Icon/IconFolder/IconFolder";
import IconFolderPlus from "../Icon/IconFolder/IconFolderPlus";
import IconFolderMinus from "../Icon/IconFolder/IconFolderMinus";

interface IRouteGroup {
  isGroup: true;
  children: IRoute[];
}

interface IRouteDefault {
  isGroup?: false;
}

type IRoute = {
  id?: string;
  label: string;
  path: LinkProps["to"];
} & (IRouteGroup | IRouteDefault);

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  list: IRoute[];
}

const SidebarTreeViewList: FC<Props> = ({ list, ...props }) => {
  const [show, setShow] = useState<Record<number, boolean>>({});

  return (
    <ul {...props}>
      {list.map((route, index) => {
        return route.isGroup ? (
          <li key={index}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setShow({ ...show, [index]: !show[index] });
              }}
              className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block w-full"
            >
              {show[index] ? (
                <IconFolderMinus className="inline-block h-4 w-4 mr-1" />
              ) : (
                <IconFolderPlus className="inline-block h-4 w-4 mr-1" />
              )}
              {route.label}
            </a>
            {show[index] && (
              <div className="border-l border-black border-dashed pl-2 ml-4">
                {route.children.map((r, idx) => (
                  <NavLink
                    key={r.id ?? idx}
                    to={r.path}
                    className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block"
                  >
                    <IconFolder className="inline-block h-4 w-4 mr-1" />
                    <span>{r.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </li>
        ) : (
          <NavLink
            key={index}
            to={route.path}
            className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block"
          >
            <IconFolder className="inline-block h-4 w-4 mr-1" />
            <span>{route.label}</span>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default SidebarTreeViewList;
