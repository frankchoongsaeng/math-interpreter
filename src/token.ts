import Position from "./position"

export enum TokenType {
    Number,
    Plus,
    Minus,
    Star,
    Slash,
    LParen,
    RParen,
    EOF,
}

export interface TokenDescriptionInterface {
    tokenType: TokenType
    text: string
    position: Position
}

export class NumberToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.Number
    constructor(public text: string, public position: Position, public literal: number) { }
}

export class PlusToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.Plus
    public text: string = "+" 
    constructor(public position: Position) { }
}

export class MinusToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.Minus
    public text: string = "-" 
    constructor(public position: Position) { }
}

export class StarToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.Star
    public text: string = "*" 
    constructor(public position: Position) { }
}

export class SlashToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.Slash
    public text: string = "/" 
    constructor(public position: Position) { }
}

export class LParenToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.LParen
    public text: string = "(" 
    constructor(public position: Position) { }
}

export class RParenToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.RParen
    public text: string = ")" 
    constructor(public position: Position) { }
}

export class EOFToken implements TokenDescriptionInterface {
    tokenType: TokenType = TokenType.EOF;
    public text: string = ""
    constructor(public position: Position) {}
}

export type Token = 
    | NumberToken
    | PlusToken
    | MinusToken
    | StarToken
    | SlashToken
    | LParenToken
    | RParenToken
    | EOFToken