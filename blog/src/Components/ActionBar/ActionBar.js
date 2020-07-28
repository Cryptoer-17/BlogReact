import React, {  } from 'react';
import classes from './ActionBar.module.css';
import { FaHeart, FaRegCommentDots, FaEllipsisH } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const ActionBar = (props) => {
    console.log(props.id);
    return(<>
    <div className={classes.ActionBar}>
        <div className={classes.Actions}>
            <FaHeart className={classes.Like} style={{ color: props.color }} onClick={props.onClick} />
            <div id="messageIcon" onClick={props.viewComments}><FaRegCommentDots className={classes.Comments} /></div>
        </div>
        {props.disableMore ? null :
            <div className={classes.MoreDiv} >
                <FaEllipsisH className={classes.More} onClick={()=>props.clickMenu(props.id)} />
                <div className={classes.DropdownContent} style={props.showdropdown ? { display: 'block' } : null} >
                    <button type="button"  onClick={() => props.modalDelete()} style={{ cursor: 'pointer',background:'none',border:'none',fontSize:'1.1rem', fontFamily:'none' }}>Elimina</button>
                    <NavLink to={"/modifica/" + props.id}/*className={classes.Link} activeClassName={classes.LinkAttivo}*/>Modifica</NavLink>
                </div>
            </div>}
    </div>
    </>);
}
export default ActionBar;