import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import './imageRender.css';

const ImageRender = ({
  src,
  alt,
  objectFit,
  imageProps,
  wrapperProps,
  wrapperStyleProps,
  onLoad,
  onError
}) => {
  const [isValidSrc, setIsValidSrc] = useState(!!src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    if (isValidSrc) {
      new Image().src = src;
    }
    // Image tag is not rendered for invalid src - Hence the check for ref's presence.
    if (!!imageRef.current?.complete) {
      showImage();
    }
  }, []);

  const showImage = useCallback(
    (loadEvent = null) => {
      setImageLoaded(true);
      if (loadEvent !== null && onLoad && typeof onLoad === "function") {
        onLoad(loadEvent);
      }
    },
    [setImageLoaded]
  );

  const handleError = useCallback(
    (errorEvent = null) => {
      setIsValidSrc(false);
      if (errorEvent !== null && onError && typeof onError === "function") {
        onError(errorEvent);
      }
    },
    [setIsValidSrc]
  );

  const imageClassnames = `smooth-image img-${
    imageLoaded ? "visible" : "hidden"
  }`;

  return (
    <div
      {...wrapperProps}
      style={wrapperStyleProps ? wrapperStyleProps : {}}
      className={`smooth-image-wrapper${
        wrapperProps?.className ? ` ${wrapperProps.className}` : ""
      }`}
    >
      {isValidSrc ? (
        <img
          ref={imageRef}
          style={{ objectFit }}
          src={src}
          alt={alt}
          onLoad={showImage}
          onError={handleError}
          {...imageProps}
          className={`${imageClassnames}${
            imageProps?.className ? ` ${imageProps?.className}` : ""
          }`}
        />
      ) : (
        <div className="smooth-no-image">{alt}</div>
      )}
      {isValidSrc && !imageLoaded && (
        <div className="smooth-preloader">
          <span className="loader" />
        </div>
      )}
    </div>
  );
};

ImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  objectFit: PropTypes.oneOf([
    "contain",
    "fill",
    "cover",
    "none",
    "scale-down"
  ]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  wrapperProps: PropTypes.shape({}),
  wrapperStyleProps: PropTypes.shape({}),
  imageProps: PropTypes.shape({})
};

ImageRender.defaultProps = {
  alt: "not found",
  objectFit: "contain",
  onLoad: null,
  onError: null,
  wrapperProps: {},
  wrapperStyleProps: { width: '100%', height: '100%'},
  imageProps: {}
};

export default memo(ImageRender);