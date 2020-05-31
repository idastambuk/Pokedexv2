import * as React from "react";
import Pagination from "react-js-pagination";
// import { boolean } from "@storybook/addon-knobs";


interface IProps {
    activePage?: number
    itemsPerPage: number
    nextPageText: any // JSX.Element
    prevPageText: any // JSX.Element
    pageRangeDisplayed?: number
    totalItems: number
    totalItemsLabel?: string | React.ReactNode
    hideFirstLastPages?: boolean
    onChange: (index : number) => void
}

interface IState {
    activePage: number

}


export default class MaterialPagination extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.state = {
            activePage: props.activePage ? props.activePage : 1  
        }

    }

    public render() {
        const { hideFirstLastPages, itemsPerPage, nextPageText, prevPageText, pageRangeDisplayed, totalItems} = this.props;
        return (
            <div className="MaterialPagination__wrapper">
                <div className="MaterialPagination">
                    <Pagination
                        hideFirstLastPages={hideFirstLastPages}
                        activePage={this.state.activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 3}
                        onChange={this.handlePageChange}
                        linkClassNext="MaterialPagination__next"
                        prevPageText={prevPageText}
                        itemClass="MaterialPagination__item"
                        nextPageText={nextPageText}
                        linkClassPrev="MaterialPagination__prev"
                        innerClass="MaterialPagination__list"
                        linkClass="MaterialPagination__link"
                    />
                </div>
            </div>

        );
    }
    private handlePageChange = (pageNumber: number) => {
        this.props.onChange(pageNumber);
        this.setState({ activePage: pageNumber });
    }
}
