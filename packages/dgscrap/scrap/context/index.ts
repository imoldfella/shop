
type PageStateData = {
    sections: () => readonly Section[];
    addSection: (title: string, href: string) => void;
};
// by using a page state provider, maybe its easier to make this data available to mdx plugins
export const PageStateContext = createContext<PageStateData>();
export const usePageState = () => useContext(PageStateContext);

export const PageStateProvider: = (props: ParentProps) => {
    const [store, setStore] = createStore<{ sections: Section[]; path: string }>({
        sections: [],
        path: "",
    });

    const data: PageStateData = {
        sections() {
            return store.sections;
        },
        addSection(title, href) {
            setStore("sections", (sections) => [
                ...new Set([...sections, { title, href }]),
            ]);
        },
    };

    createEffect(() => {
        const { pathname } = useLocation();
        setStore("sections", []);
        setStore("path", pathname);
    });

    return (
        <PageStateContext.Provider value= { data } >
        { props.children }
        < /PageStateContext.Provider>
    );
  };