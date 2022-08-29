const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce(function(sum, item) {
    return sum + item.likes
  }, 0)
  return result
}

const favouriteBlog = (blogs) => {
  return blogs.find(x => x.likes === Math.max(...blogs.map(y => y.likes)))
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}