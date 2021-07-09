import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';

export const initialState = {
    dishes: DISHES,
	leaders: LEADERS,
	comments: COMMENTS,
	promotions: PROMOTIONS,
};

export const Reducer = (state = initialState,action) => {
	return state;

}