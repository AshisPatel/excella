// action calls

// action call to open a blank modal for new contact
export const newContactModal = () => {
    return {
        type: 'OPEN_NEW_CONTACT_MODAL'
    };
};
// action call to open a modal to update an existing job
export const updateContactModal = (contact) => {
    return {
        type: 'OPEN_UPDATE_CONTACT_MODAL',
        payload: contact 
    };
};
// action call to close modal
export const closeContactModal = () => {
    return {
        type: 'CLOSE_CONTACT_MODAL'
    };
};

const initialState = {
    showContactModal: false,
    update: false,
    contact: {}
};

export default function contactModalReducer(contactModal = initialState, { type, payload }) {
    switch(type) {
        case 'OPEN_NEW_CONTACT_MODAL':
            return {
                contact: {},
                update: false,
                showContactModal:true
            };
        case 'OPEN_UPDATE_CONTACT_MODAL':
            return {
                showContactModal:true,
                update: true, 
                contact: payload
            };
        case 'CLOSE_CONTACT_MODAL':
            return {
                showContactModal:false,
                update: false, 
                contact: {}
            };
        default: 
            return contactModal; 
    }
};