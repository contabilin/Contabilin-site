
import { supabase } from './supabaseClient';
import { BlogPost } from '../types';

export const blogService = {
    // Fetch all posts
    async getPosts(): Promise<BlogPost[]> {
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        return data || [];
    },

    // Save or update a post
    async savePost(post: BlogPost): Promise<boolean> {
        if (!supabase) return false;

        // Remove any undefined fields to avoid Supabase errors (JSONB fields can be tricky)
        const postData = {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            imageUrl: post.imageUrl,
            readTime: post.readTime,
            date: post.date,
            seo: post.seo
        };

        const { error } = await supabase
            .from('posts')
            .upsert(postData);

        if (error) {
            console.error('Error saving post:', error);
            return false;
        }

        return true;
    },

    // Delete a post
    async deletePost(id: string): Promise<boolean> {
        if (!supabase) return false;

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting post:', error);
            return false;
        }

        return true;
    }
};
