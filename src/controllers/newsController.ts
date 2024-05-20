import { Request, Response } from "express";
import pool from "../db";

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM news");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const addNews = async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    imageUrl,
    content,
    author,
    category,
    is_published,
    description,
  } = req.body;

  // Validate required fields
  if (!title || !content || !imageUrl) {
    res
      .status(400)
      .json({ error: "Title, content, and imageUrl are required fields" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO news (title, imageUrl, content, description, author, category, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, imageUrl, content, description, author, category, is_published]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query("SELECT * FROM news WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "No News with that id" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const updateNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { title, content, author, category, is_published } = req.body;

  try {
    const result = await pool.query(
      "UPDATE news SET title = $1, content = $2, author = $3, category = $4, is_published = $5 WHERE id = $6 RETURNING *",
      [title, content, author, category, is_published, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await pool.query("DELETE FROM news WHERE id = $1", [id]);
    res.status(204).send("News deleted successfully");
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
