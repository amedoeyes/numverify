import { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log(new Date(), req.method, req.path, req.body);
	next();
};

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.message);
	next(err);
};

export default {
	requestLogger,
	errorHandler,
};
