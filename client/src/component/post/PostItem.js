import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost,addLike, removeLike } from '../../actions/postAction';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 zoom">
            <Link to={`/profile/user/${post.user}`}>
              <img
                className="rounded mx-auto d-block z-depth-1 img-thumbnail"
                src={post.avatar}
                style={{height:'84px',width:'84px'}}
                alt="profile"
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <div className="lead" style={{fontSize:'18px'}} dangerouslySetInnerHTML={{ __html: post.text}}></div>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-floating btn-light btn-sm mr-1"
                >
                  <i
                    className={classnames('fa fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-floating btn-light btn-sm mr-1"
                >
                  <i className="text-secondary fa fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-sm btn-floating btn-dark mr-1">
                  Comments&nbsp;&nbsp;<span className="counter counter-lg">{post.comments.length ? post.comments.length :''}</span>
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    title='Delete Post'
                    className="btn btn-floating btn-sm del mr-1"
                  >
                    <i className="fa fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost,addLike, removeLike})(
  PostItem
);
