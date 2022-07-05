const Backdrop = ({ children }: any) => {
    return (
        <div className="dark:bg-gray fixed inset-0 flex items-center justify-center bg-white z-[50] bg-opacity-30">
            {children}
        </div>
    )
}

export default Backdrop
