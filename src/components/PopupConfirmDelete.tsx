import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { deleteTask } from "../asyncActions/thunkFunctions";
import PopupWithForm from "./PopupWithForm";


const PopupConfirmDelete = (props: any) => {
    const dispatch = useDispatch();

    const handleSubmitDeleteTask = (e: any) => {
        e.preventDefault();
        const taskId = props.id;
        dispatch(deleteTask(taskId));
        props.onClose();
        dispatch(push(`/`));
    }


    return (
        <PopupWithForm name="confirm_delete"
                       title="Хотите удалить?"
                       buttonText="Да"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitDeleteTask}>
            <p className="popup__name">"{props.name}"</p>
            <button className="popup__button-save popup__button-cancel"
                    type="button"
                    aria-label="Отмена"
                    onClick={props.onClose}>Нет</button>
        </PopupWithForm>
    )
}

export default PopupConfirmDelete;
