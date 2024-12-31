export const healthTest = (req, res) => {
    res.status(200).json({
        message: "Server is healthy",
    });
};