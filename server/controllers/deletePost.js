import PostModel from "../models/PostModel.js";

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  await PostModel.findByIdAndDelete({ _id: id })
    .then((response) => {
      res.json("Deleted");
    })
    .catch((error) => {
      res.json(error);
    });
};

export const handleLikeController = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.body;
    const output = await PostModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { like: authorId },
      },
      { new: true }
    );
    res.status(201).json({
        success: true,
        message: "like added",
        output
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "error with like",
      error,
    });
  }
};

export const handleUnLikeController = async (req, res) => {
    try {
        const { postId } = req.params;
        const output = await PostModel.findByIdAndUpdate(
          postId,
          {
            $pull: { like: req._id },
          },
          { new: true }
        );
        res.status(201).send({
            success: true,
            message: "like added",
            output
        })
      } catch (error) {
    res.status(404).send({
      success: false,
      message: "error with unlike",
      error,
    });
  }
};
