import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterIcon from "assets/images/icons8-filter.svg";
import IconCheck from "assets/images/blue-check.svg";

export default function FilterDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={FilterIcon} alt="Filter" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <div><img src={IconCheck} alt="" /></div>
                    <div className='ml-2'>CPMI.Công ty Cổ phần CONINCO Quản...</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div><img className='invisible' src={IconCheck} alt="" /></div>
                    <div className='ml-2'>CPMI.Công ty Cổ phần CONINCO Quản...</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div><img className='invisible' src={IconCheck} alt="" /></div>
                    <div className='ml-2'>CPMI.Công ty Cổ phần CONINCO Quản...</div>
                </MenuItem>
            </Menu>
        </div>
    );
}
