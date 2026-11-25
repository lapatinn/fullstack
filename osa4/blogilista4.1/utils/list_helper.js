const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    
    return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.toSorted(function(a, b){
      return b.likes - a.likes
    })[0]
  } else {
    return "no blogs"
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}