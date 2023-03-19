import { createContext, Dispatch, useReducer } from "react";

type State = {
  token: string;
};

type Action = {
  type: "SET_TOKEN";
  payload: {
    token: string;
  };
};

const initialState: State = {
  token: "",
};

export const Store = createContext<{
    state: State;
    dispatch: React.Dispatch<any>;
  }>({state: initialState, dispatch: () => null});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_TOKEN": {
      return { ...state, token: action.payload.token};
    }
  }
}

type ProviderProps = {
  children: React.ReactNode
}

const StoreProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: { state: State; dispatch: Dispatch<Action> } = {
    state,
    dispatch,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export {StoreProvider}
