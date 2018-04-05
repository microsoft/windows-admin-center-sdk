interface StringPolyfills {
    /**
     * Formats a string based on its key value pair object.
     *
     * @param args The list of arguments format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
     * @return Formatted string.
     */
    format(...restArgs: any[]): string;
}

interface String extends StringPolyfills {
}
