import React from 'react';
import './Post.css';

const posts = (props) => {
    const style = {
        width: '60%',
        margin: '16px auto',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        padding: '16px',
        textAlign: 'center'
    };
    let input = 'Click to edit';
    console.log('Can Edit?', props.canEdit, props.id);
    if (props.canEdit) {
        const style = {
            display: 'inline-block',
            margin: '16px'
        };
        const onKeyPressHandler = (event) => {
            if (event.key === 'Enter') {
                console.log('Pressing Enter...');
                return props.doneEditing();
            }
        }
        input = (
            <div className='form-inline' style={style} onKeyPress={onKeyPressHandler}>
                <input className='form-control' placeholder='message' type='text' onChange={props.change} />
                <button className='btn btn-primary' type='button' onClick={props.doneEditing}>Done</button>
            </div>
        );
    }
    let close = null;
    if (props.canEdit) {
        close = (
            <span id='close'>X</span>
        );
    }
    return (
        <div 
            className='Post' 
            style={style} 
            onClick={ !props.canEdit ? props.click : null}>
                { close }
                <h3>{props.title}</h3>
                <p><b>{props.userName}</b></p>
                <p>{props.message}</p>
                { input }
        </div>
    );
};

export default posts;