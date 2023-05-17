// ** React Import
import { Fragment, useRef, useState, useEffect } from "react";

// ** MUI Import
import List from "@mui/material/List";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Type Import
import { LayoutProps } from "src/@core/layouts/types";

import themeConfig from "src/configs/themeConfig";

// ** Component Imports
import Drawer from "./Drawer";
import VerticalNavItems from "./VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  navWidth: number;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps["hidden"];
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  settings: LayoutProps["settings"];
  children: LayoutProps["children"];
  setNavVisible: (value: boolean) => void;
  saveSettings: LayoutProps["saveSettings"];
  navMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["content"];
  navMenuBranding: LayoutProps["verticalLayoutProps"]["navMenu"]["branding"];
  menuLockedIcon: LayoutProps["verticalLayoutProps"]["navMenu"]["lockedIcon"];
  verticalNavItems: LayoutProps["verticalLayoutProps"]["navMenu"]["navItems"];
  navMenuProps: LayoutProps["verticalLayoutProps"]["navMenu"]["componentProps"];
  menuUnlockedIcon: LayoutProps["verticalLayoutProps"]["navMenu"]["unlockedIcon"];
  afterNavMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["afterContent"];
  beforeNavMenuContent: LayoutProps["verticalLayoutProps"]["navMenu"]["beforeContent"];
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  height: theme.mixins.toolbar.minHeight,
  transition: "opacity .15s ease-in-out",
  "&.scrolled": {
    opacity: 1,
  },
}));

const NavItem = styled(Box)<BoxProps>(({ theme }) => ({
  padding: "7px 24px",
  display: "flex",
  alignItems: "center",
  borderTopRightRadius: "50px",
  borderBottomRightRadius: "50px",
}));

const NavIcon = styled(Box)<BoxProps>(({ theme }) => ({
  marginRight: "17px",
  display: "flex",
  minWidth: "20px",
}));

const Navigation = (props: Props) => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navMenuContent: userNavMenuContent,
  } = props;

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useRouter();
  // ** Ref
  const shadowRef = useRef(null);

  // ** Hooks
  const theme = useTheme();
  const { mode } = settings;

  // ** Var
  const { beforeVerticalNavMenuContentPosition } = themeConfig;

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect;

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };




  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    if (
      beforeVerticalNavMenuContentPosition === "static" ||
      !beforeNavMenuContent
    ) {
      container = hidden ? container.target : container;
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains("scrolled")) {
          // @ts-ignore
          shadowRef.current.classList.add("scrolled");
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove("scrolled");
      }
    }
  };

  const shadowBgColor = () => {
    if (mode === "light") {
      return `linear-gradient(${theme.palette.customColors.lightBg} 5%,${(theme.palette.customColors.lightBg, 0.85)
        } 30%,${(theme.palette.customColors.lightBg, 0.5)} 65%,${(theme.palette.customColors.lightBg, 0.3)
        } 75%,transparent)`;
    } else {
      return `linear-gradient(${theme.palette.customColors.darkBg} 5%,${(theme.palette.customColors.darkBg, 0.85)
        } 30%,${(theme.palette.customColors.darkBg, 0.5)} 65%,${(theme.palette.customColors.darkBg, 0.3)
        } 75%,transparent)`;
    }
  };

  const ScrollWrapper = hidden ? Box : PerfectScrollbar;

  return (
    <Fragment>
      {loading ? (
        <Box className="loading-overlay">
          <Box className="loading-wrapper">

          </Box>
        </Box>
      ) : null}
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover} >
        <VerticalNavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent &&
          beforeVerticalNavMenuContentPosition === "fixed"
          ? beforeNavMenuContent(props)
          : null}
        {(beforeVerticalNavMenuContentPosition === "static" ||
          !beforeNavMenuContent) && (
            <StyledBoxForShadow
              ref={shadowRef}
              sx={{ background: shadowBgColor() }}
            />
          )}
        <Box sx={{ position: "relative", overflow: "hidden" }} className="my-drawer">
          {/* @ts-ignore */}
          <ScrollWrapper
            {...(hidden
              ? {
                onScroll: (container: any) => scrollMenu(container),
                sx: {
                  height: "100%",
                  overflowY: "auto",
                  overflowX: "hidden",
                },
              }
              : {
                options: { wheelPropagation: false },
                onScrollY: (container: any) => scrollMenu(container),
                containerRef: (ref: any) => handleInfiniteScroll(ref),
              })}
          >
            {beforeNavMenuContent &&
              beforeVerticalNavMenuContentPosition === "static"
              ? beforeNavMenuContent(props)
              : null}
            <List className="nav-items" sx={{ pt: 0, pr: "30px" }}>
              <Link href="/dashboard/resources">
                <NavItem className={`nav-item ${pathname.includes("/dashboard/resources/")
                  ? "active-nav"
                  : null
                  }`}>
                  <NavIcon>
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z"
                        fill="#3A3541"
                        fillOpacity="0.87"
                      />
                    </svg>
                  </NavIcon>
                  Resources
                </NavItem>
              </Link>
              <Link href="/dashboard/departments">
                <NavItem
                  className={`nav-item ${pathname.includes("/dashboard/departments")
                    ? "active-nav"
                    : null
                    }`}
                  sx={{ whiteSpace: "noWrap", marginTop: "10px" }}
                >
                  <NavIcon>
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z"
                        fill="#3A3541"
                        fillOpacity="0.87"
                      />
                    </svg>
                  </NavIcon>
                  Departments
                </NavItem>
              </Link>
              <Link href="/dashboard/projects/">
                <NavItem
                  className={`nav-item ${pathname.includes("/dashboard/projects")
                    ? "active-nav"
                    : null
                    }`}
                  sx={{ whiteSpace: "noWrap", marginTop: "10px" }}
                >
                  <NavIcon>
                    <svg
                      width="18"
                      height="22"
                      viewBox="0 0 18 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V20C0 21.1 0.9 22 2 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM16 20H2V4H4V7H14V4H16V20Z"
                        fill="#3A3541"
                        fillOpacity="0.87"
                      />
                    </svg>
                  </NavIcon>
                  Projects
                </NavItem>
              </Link>
              <Link href="/dashboard/billing">
                <NavItem
                  className={`nav-item ${pathname.includes("/dashboard/billing")
                    ? "active-nav"
                    : null
                    }`}
                  sx={{ whiteSpace: "noWrap", marginTop: "10px" }}
                >
                  <NavIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 1.9C9.16 1.9 10.1 2.84 10.1 4C10.1 5.16 9.16 6.1 8 6.1C6.84 6.1 5.9 5.16 5.9 4C5.9 2.84 6.84 1.9 8 1.9ZM8 10.9C10.97 10.9 14.1 12.36 14.1 13V14.1H1.9V13C1.9 12.36 5.03 10.9 8 10.9ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                        fill="#3A3541"
                        fillOpacity="0.87"
                      />
                    </svg>
                  </NavIcon>
                  Billing
                </NavItem>
              </Link>
            </List>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default Navigation;
