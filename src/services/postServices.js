import mongoose from "mongoose";
import PostLike from "../models/postLike.js";
import { Post } from "../models/post.js";
import { Profile } from "../models/profile.js";

const postServices = {
	// Like a post
	likePost: async (postId, userId, profileId) => {
		try {
			const postLike = new PostLike({ postId, userId, profileId });
			await postLike.save();

			const post = await Post.findById(postId);
			if (!post) {
				throw new Error('Post not found');
			}
			post.likes.push(postLike._id);
			await post.save();

			const profile = await Profile.findById(profileId);
			if (!profile) {
				throw new Error('Profile not found');
			}
			profile.postLikes.push(postLike._id);
			await profile.save();

			return postLike;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to like post');
		}
	},

	// Unlike a post
	unlikePost: async (postId, userId) => {
		try {
			await PostLike.deleteOne({ postId, userId });
		} catch (error) {
			console.error(error);
			throw new Error('Failed to unlike post');
		}
	},

	// Get likes for a post
	getPostLikes: async (postId) => {
		try {
			const likes = await PostLike.find({ postId }).populate('userId', 'username');
			return likes;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch post likes');
		}
	},
};

export default postServices;

