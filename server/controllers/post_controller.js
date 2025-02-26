import PostModel from "../models/PostModel.js";

const AllPosts = async (req, res) => {
  //   PostModel.find()
  //     .then((response) => {
  //       console.log("res: ", response);
  //       res.json(response);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  try {
    const response = await PostModel.find();
    if (response) {
      res.status(200).send({
        success: true,
        message: "Posts retrieved successfully",
        data: response,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No posts found",
      });
    }
  } catch (error) {
    console.log(`Error with get all posts: ${error}`);
    res.status(401).send({
      success: false,
      message: "Error with getting posts",
      error: error,
    });
  }
};

export default AllPosts;
