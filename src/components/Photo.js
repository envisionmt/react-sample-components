import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import compose from "recompose/compose"
import { PHOTOS_FETCH_REQUEST_ } from '../store/photos'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { DEV_URL } from "../constant/constant";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 'auto',
  }
})

class Photo extends Component {

  componentDidMount() {
    this.props.photoFetch(DEV_URL + "photos?name=" + "20411")
  }

  render() {
    const { classes, photos } = this.props;

    const images = [];

    if (photos !== undefined)  {

      Object.keys(photos).forEach(function(key) {
        images.push({original: photos[key].publicUrl, thumbnail: photos[key].thumbUrl})
      })
    }

    return (
      <div className={classes.root}>
        {
          images.length > 0 ?
          (<ImageGallery items={images} thumbnailPosition={'right'}/>) :
          ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos,
});

const mapDispatchToProps = dispatch => ({
  photoFetch: name => dispatch(PHOTOS_FETCH_REQUEST_(name))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Photo);