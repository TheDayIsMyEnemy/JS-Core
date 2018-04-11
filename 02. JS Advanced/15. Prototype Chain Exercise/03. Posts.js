function solve() {
    class Post{
        constructor(title, content){
            this.title = title;
            this.content = content;
        }

        toString(){
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post{
        constructor(title, content, likes, dislikes){
            super(title, content)
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment){
            this.comments.push(comment);
        }

        toString(){
           let result = super.toString() + `\nRating: ${this.likes - this.dislikes}`;
            if(this.comments.length > 0){
                result+='\nComments:\n' + this.comments.map(f=> ' * ' + f).join('\n');
            }
            return result;
        }
    }

    class BlogPost extends Post{
        constructor(title, content, views){
            super(title, content)
            this.views = views;
        }

        toString(){
            return super.toString() + `\nViews: ${this.views}`;
        }

        view(){
            this.views++;
            return this;
        }
    }

    return {Post, SocialMediaPost, BlogPost};
}
