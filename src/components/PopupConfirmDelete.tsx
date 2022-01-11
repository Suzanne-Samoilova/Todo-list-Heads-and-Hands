import PopupWithForm from "./PopupWithForm";
import React from "react";
import {useDispatch} from "react-redux";
import {filtersTasks} from "../asyncActions/thunkFunctions";
import axios from "axios";

function PopupConfirmDelete(props: any) {
    const dispatch = useDispatch();

    // сабмит попапа Удалить таск
    function handleSubmitDeleteTask(e: any) {
        e.preventDefault();
        axios.delete(`http://localhost:3001/todo/${props.id}`)
            .then(resp => {
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error));
        console.log('SUBMIT Удалить сработал!');
        props.onClose();
    }


    return (
        <PopupWithForm name="confirm_delete"
                       title="Хотите удалить?"
                       buttonText="Да"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitDeleteTask}>
            <p style={{maxWidth: "300px", margin: "5px auto 0", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap", fontSize: "18px"}}>"{props.name}"</p>
            <button className="popup__button-save popup__button-cancel"
                    type="button"
                    aria-label="Отмена"
                    onClick={props.onClose}>Нет</button>
        </PopupWithForm>
    )
}

export default PopupConfirmDelete;