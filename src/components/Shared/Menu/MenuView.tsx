import React, { FC } from "react";
import {
  IconButton,
  Link,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem as MuiMenuItem,
  Typography
} from "@material-ui/core";
import { useMenu } from "./useMenu";
import { MenuItem } from "@employer-tracker-ui/Utils";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);

type MenuViewProps = {
  /**
   * Text label of the menu. Used for displaying tooltip, accessibility and dom querying in jest tests.
   */
  label: string;
  menuItemsList: Array<MenuItem>;
  /**
   * A render prop for overriding the presentation of a menu icon. If this does not exist the menu icon defaults to <MenuIcon fontSize="large" />
   */
  menuIconRenderer?: JSX.Element;
};
const MenuView: FC<MenuViewProps> = ({
  label,
  menuItemsList,
  menuIconRenderer
}: MenuViewProps) => {
  const classes = useStyles();
  const { isOpen, handleMenuClose, handleMenuToggle, anchorRef } = useMenu();
  return (
    <div className={classes.root}>
      {menuIconRenderer ? (
        <Tooltip title={label}>
          <IconButton
            ref={anchorRef}
            aria-controls={isOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleMenuToggle}
            aria-label={label}
            color="inherit"
          >
            {menuIconRenderer}
          </IconButton>
        </Tooltip>
      ) : (
        <MenuIcon fontSize="large" />
      )}
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role="dialog"
        transition
        disablePortal
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "viewport"
          }
        }}
        aria-label={`${label} popup`}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList
                  autoFocusItem={isOpen}
                  id="menu-list-grow"
                  role="menu"
                >
                  {menuItemsList.map((menuItem, index) => (
                    <MuiMenuItem
                      key={`${menuItem.label} ${index}`}
                      aria-label={menuItem.label}
                      onClick={handleMenuClose}
                      role="menuitem"
                    >
                      {menuItem.href ? (
                        <Link href={menuItem.href} color="inherit">
                          <Typography>{menuItem.label}</Typography>
                        </Link>
                      ) : (
                        <>{menuItem.label}</>
                      )}
                    </MuiMenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuView;
