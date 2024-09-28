declare module '*.css' { //typescript does not know how to handle css files
                        // so we need to declare a module for it
    const content: { [className: string]: string 
    };
    export default content;
  }