// import {create} from 'zustand';

// interface EditModalStore{
//     isOpen: boolean,
//     onOpen: () => void;
//     onClose: () => void;
// }

// const useEditModal = create<EditModalStore>((set) =>({
//     isOpen: false,
//     onOpen: () => set({isOpen: true}),
//     onClose: () => set({isOpen: false}),

// }));

// export default useEditModal;

import { create } from 'zustand';

interface EditModalStore {
    isOpen: boolean;
    data: any | null;
    onOpen: (data: any) => void;
    onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    data: null,
    onOpen: (data: any) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: null }),
}));

export default useEditModal;
