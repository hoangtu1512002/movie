import PropType from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import './Modal.scss';

const Modal = props => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])


    return (<div id={props.id} className={`modal ${active ? "active" : ''}`}>
        {props.children}
    </div> );
}

Modal.prototype = {
    active: PropType.bool,
    id: PropType.string
}

export default Modal;

export const ModalContent = props => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if(props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className='modal__content'>
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className='bx bx-x'></i>
            </div>
        </div>
    )
}

ModalContent.prototype = {
    onClose: PropType.func
}
