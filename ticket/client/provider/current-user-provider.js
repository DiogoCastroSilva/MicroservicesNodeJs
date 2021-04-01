import { createContext, useState } from 'react';



export const CurrentUserContext = createContext({
    curentuser: null,
    onSetCurrentuser: (user) => {}
});

const CurrentUserProvider = ({ children }) => {
    const [currentuser, setCurrentuser] = useState(null);

    const onSetCurrentuser = (user) => setCurrentuser(user);

    const contextValue = {
        currentuser,
        onSetCurrentuser
    };

    return (
        <CurrentUserContext.Provider value={contextValue}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export default CurrentUserProvider;