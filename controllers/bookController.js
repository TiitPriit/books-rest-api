import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getAllBooks = async (req, res) => {
        try {
            const allBooks = await prisma.books.findMany();
            res.status(200).json(allBooks);
        } catch (error) {
            res.status(404).send({ error: 'Books not found!' });
        }
    ;
};

export const getBookById = async (req, res) => {
        const { id } = req.params;
        try {
            const book = await prisma.books.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).send({ error: 'Book not found!' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal server error!' });
        }
    ;
};
export const deleteBook = async (req, res) => {
        try {
            const deletedBook = await prisma.books.delete({
                where: {
                    id: Number(req.params.id),
                },
            });
            if (deletedBook) {
                res.status(200).send({ message: 'Book deleted successfully!' });
            } else {
                res.status(404).send({ error: 'Book not found!' });
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal server error!' });
        }
    ;
};
export const createBook = async (req, res) => {
        const { title, release_date, language, price, pages, type } = req.body;
        if (!title || !release_date || !language || !price || !pages || !type) {
            res.status(400).send({ error: 'Title, release_date, language, price, pages, and type are required.' });
            return;
        }
        try {
            const newBook = await prisma.books.create({
                data: {
                    title,
                    release_date,
                    language,
                    price,
                    pages,
                    type,
                },
            });
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).send({ error: 'Internal server error!' });
        }
    ;
};
export const updateBook = async (req, res) => {
        const { id } = req.params;
        const { title, release_date, language, price, pages, type } = req.body;
        try {
            const updatedBook = await prisma.books.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    title,
                    release_date,
                    language,
                    price,
                    pages,
                    type,
                },
            });
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(500).send({ error: 'Internal server error!' });
        }
    ;
};