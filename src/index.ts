import Position from './position'
import { EOFToken, LParenToken, MinusToken, NumberToken, PlusToken, RParenToken, SlashToken, StarToken, Token, TokenType } from './token'

type Char = string;

class Parser {
    start = 0;
    current = 0;
    line = 1;
    tokens: Token[] = [];

    constructor(private input: string) { }

    parseTokens(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.parseToken()
        };

        this.tokens.push(new EOFToken(this.position));

        return this.tokens;
    }

    private parseToken(): void {
        let currentChar = this.advance();

        switch (currentChar) {
            case "+":
                this.addToken(new PlusToken(this.position));
                break;
            case "-":
                this.addToken(new MinusToken(this.position));
                break;
            case "*":
                this.addToken(new StarToken(this.position));
                break;
            case "/":
                this.addToken(new SlashToken(this.position));
                break;
            case "(":
                this.addToken(new LParenToken(this.position));
                break;
            case ")":
                this.addToken(new RParenToken(this.position));
                break;
            case " ":
                break;
            case "\r":
            case "\n":
                this.line++;
                break;
            default:
                if (this.isNumber(currentChar)) {
                    this.matchNumber();
                }
        }
    }

    private advance(): string {
        return this.input[this.current++];
    }

    private peek(): Char {
        return this.input[this.current];
    }

    private peekAhead(): Char {
        return this.input[this.current + 1];
    }

    private matchNumber(): void {
        while (this.isNumber(this.peek())) {
            this.advance();
        }

        // if the number contains a dot followed by a number, consume the dot
        if (this.peek() === "." && this.isNumber(this.peekAhead())) {
            this.advance();
        }

        // consume the numbers that follow the dot
        while (this.isNumber(this.peek())) {
            this.advance();
        }

        const text = this.getText
        const literal = parseFloat(text)
        this.addToken(new NumberToken(text, this.position, literal));
    }

    private isAtEnd(): boolean {
        return this.current >= this.input.length;
    }

    private isNumber(char: Char): boolean {
        return char >= "0" && char <= "9";
    }

    private get getText(): string {
        return this.input.substring(this.start, this.current)
    }

    private get position(): Position {
        return new Position(this.line, this.start, this.current);
    }

    private addToken(token: Token): void {
        this.tokens.push(token);
    }
}

const parser = new Parser("1.2 * 3");
const tokens = parser.parseTokens();
console.log(tokens);
