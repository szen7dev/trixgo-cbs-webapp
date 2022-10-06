import { ElementType, FC, HTMLAttributes } from "react";
import { NavLink, useRouteMatch, generatePath, LinkProps } from "react-router-dom";
import "views/media/styles/index.css";

export interface PageProps {
  id: string | number;
  path?: string;

  title: string;
  state?: unknown;
  isPrivate?: boolean;
  navExact?: boolean;
  navStrict?: boolean;

  location?: LinkProps["to"];
  isActive?: (match: any, location: any) => boolean;
}
type Props = {
  rightHeader?: ElementType;
  pages: Array<PageProps>;
};

const LayoutSecondary: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ pages, children, rightHeader: RightHeader, ...props }) => {
  const match = useRouteMatch<{ id: string }>();

  return (
    <div className="flex flex-col text-sm text-black overflow-hidden h-full" {...props}>
      {/* Header */}
      <div className="flex justify-between w-full text-primary-gray pb-1 bg-white border-cbs-border">
        <div className="flex flex-1 text-medium">
          {pages.map((page) => {
            if (page.isPrivate) return null;
            return (
              <NavLink
                key={page.id}
                className="flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3"
                activeClassName="border-cbs-primary text-cbs-primary font-bold"
                to={page.location ? page.location : { pathname: generatePath(page.path as string, { ...match.params }) }}
                isActive={page.isActive}
                exact={page.navExact}
                // strict={page.navStrict}
              >
                {page.title}
              </NavLink>
            );
          })}
        </div>
        {RightHeader && <RightHeader />}
      </div>
      {/* Content */}
      {children}
    </div>
  );
};

export default LayoutSecondary;
