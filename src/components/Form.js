import React from "react";

function Form() {
    return (
        <div className="authorization">
            <h2 className="authorization__title">
                Введите логин и пароль
            </h2>
            <form className="authorization__form" name="">
                <input className="" id="login"
                       type="text"
                       name="login"
                       placeholder="Логин"
                       required
                />
                <input className="" id="password"
                       type="text"
                       name="password"
                       placeholder="Пароль"
                       required
                />
                <button className="authorization__button-save" type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Form;
