interface Position {
    frmTop: Number,
    frmLeft: Number,
}

interface Options {
    option1: {
        label: String,
        behavior: () => {},
    }

    Option2?: {
        label: String,
        behavior: () => {},
    }
}

interface MenuOptions {
    status: boolean,
    options?: Options,
    className: String,
    position: Position,
}

export {
    MenuOptions,
}