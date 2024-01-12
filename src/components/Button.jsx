const Button = (params) => {
    return(
        <button
            type="button"
            disabled={params.disabled}
            className={"btn rounded-pill  " + params.className}
            onClick={params.onClick}
        >
            {params.title}
        </button>
    )
}

export default Button;