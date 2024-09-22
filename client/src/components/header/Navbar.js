import React, {useContext, useEffect, useState} from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider'
import { accordionClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Rightheader from './Rightheader';
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";



const Navbar = ()=>{
    const {account, setAccount} = useContext(LoginContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const history = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("");
    console.log(text);

    const [liopen, setListopen] = useState(true);

    const {products} = useSelector(state=>state.getproductsdata)

    const [dropen, setDropen]=useState(false);
    console.log("account: "+account);

    const getdetailvaliduser = async()=>{
        const res = await fetch("/validuser",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        const data = await res.json();
        console.log(data);

        if(res.status != 201){
            console.log("error");
        }else{
            console.log("data valid");
            setAccount(data);
        }
    };
    const onClicking=()=>{
        handleClose
        logoutuser
    }

    const getText = (iteams)=>{
        setText(iteams)
        setListopen(false)
    }

    useEffect(()=>{
        getdetailvaliduser()
    }, [])

    const handleopen=()=>{
        setDropen(true)
    }
    const handledrclose=()=>{
        setDropen(false)
    }

    const logoutuser = async()=>{
        const res2 = await fetch("/logout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status != 201){
            console.log("error");
        }else{
            console.log("data valid");
            //alert("logout")
            toast.success("user logout", {
                position:"top-center",
              })
            history("/")
            setAccount(false);
            
        }
    };

    return (
        
        <header>
            <nav>
                <div className='left'>
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{color:'white'}}/>
                    </IconButton>

                    <Drawer open={dropen} onClose={handledrclose}>
                        <Rightheader logclose={handledrclose} logoutuser={logoutuser}/>
                    </Drawer>

                    <div className='navlogo'>
                    <NavLink to="/"><img src='./amazon_PNG25.png' alt=''/></NavLink>    
                    </div>
                    <div className='nav_searchbar'>
                        <input type="text" name="" 
                        onChange={(e)=>getText(e.target.value)}
                        placeholder='Search your products'
                        id=""/>
                        <div className='search_icon'>
                            <SearchIcon/>
                        </div>

                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                        <ListItem key={1}>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setListopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }

                    </div>
                </div>


                <div className='right'>
                    <div className="nav_btn">
                        <NavLink to="/login">signin</NavLink>
                    </div>
                    <div className="cart_btn">
                        {
                            account ?<NavLink to='/buynow'>
                            <Badge badgeContent = {account.carts.length} color="primary">
                                <ShoppingCartIcon id='icon'/>
                            </Badge>
                        </NavLink>:<NavLink to='/login'>
                            <Badge badgeContent = {0} color="primary">
                                <ShoppingCartIcon id='icon'/>
                            </Badge>
                        </NavLink>
                        }
                        <ToastContainer/>
                        <p>
                            Cart
                        </p>
                    </div>
                    
                    {
                        account?<Avatar className='avtar2'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >{account.fname[0].toUpperCase}</Avatar>:<Avatar className='avtar2'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        />
                    }
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account?<MenuItem onClick={handleClose} onClick={logoutuser} ><ExitToAppIcon style={{fontSize:16, marginRight:3}}/>Logout</MenuItem>:""
                        }
                        
                    </Menu>
                </div>
            </nav>
        </header>
        
    )
}

export default Navbar;