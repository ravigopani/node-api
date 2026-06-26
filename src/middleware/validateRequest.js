export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.length ? issue.path.join('.') : 'body',
        message: issue.message,
      }));
      return res.status(400).json({
        errors,
      });
    }
    next();
  };
};