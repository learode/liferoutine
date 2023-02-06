interface Position {
    frmTop: Number,
    frmLeft: Number,
}

interface MenuOptions {
    status: boolean,
    options?: Object,
    className: String,
    position: Position,
}

export {
    MenuOptions,
}