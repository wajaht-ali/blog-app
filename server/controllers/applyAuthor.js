import AuthorApplyModel from "../models/AuthorApply.js";

export const AuthorApplication = async (req, res) => {
  try {
    const { name, email, facebook, twitter, checkbox } = req.body;
    if (!name || !email || !facebook || !twitter || !checkbox) {
      return res.status(201).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const existingApplication = await AuthorApplyModel.findOne({
      email: email,
    });
    if (existingApplication) {
      return res.status(200).send({
        success: true,
        message:
          "Application already submitted, please wait for admins approval.",
      });
    }
    const application = await new AuthorApplyModel({
      name,
      email,
      facebook,
      twitter,
      checkbox,
    }).save();

    res.status(200).send({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.log(`Error with apply Route ${error}`);
  }
};