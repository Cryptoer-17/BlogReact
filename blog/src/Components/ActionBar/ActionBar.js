import React, {  } from 'react';
import classes from './ActionBar.module.css';
import { FaHeart, FaRegCommentDots, FaEllipsisH } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const ActionBar = (props) => {
    const { disableMore, color, showdropdown, id } = props;
    return(<>
    <div className={classes.ActionBar}>
        <div className={classes.Actions}>
            <FaHeart className={classes.Like} style={{ color: color }} onClick={props.onClick} />
            <div id="messageIcon" onClick={props.viewComments}><FaRegCommentDots className={classes.Comments} /></div>
        </div>
        {disableMore ? null :
            <div className={classes.MoreDiv} >
                <FaEllipsisH className={classes.More} onClick={()=>props.clickMenu(props.id)} />
                <div className={classes.DropdownContent} style={showdropdown ? { display: 'block' } : null} >
                    <button type="button"  onClick={() => props.modalDelete()} style={{ cursor: 'pointer',background:'none',border:'none',fontSize:'1.1rem', fontFamily:'none' }}>Elimina</button>
                    <NavLink to={"/modifica/" + id}/*className={classes.Link} activeClassName={classes.LinkAttivo}*/>Modifica</NavLink>
                </div>
            </div>}
    </div>
    </>);
}
export default ActionBar;