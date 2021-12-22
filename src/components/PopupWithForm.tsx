function PopupWithForm(props: any) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <button className="popup__button-close"
                        type="button"
                        aria-label="Закрыть попап"
                        onClick={props.onClose}
                />
                <div className="">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form"
                          name={props.name}
                          onSubmit={props.onSubmit}
                    >
                        {props.children}

                        <button className="popup__button-save"
                                type="submit"
                        >
                            {props.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;
