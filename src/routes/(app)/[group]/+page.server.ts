import GroupModel from '$lib/db/groups';
import type { PageServerLoad } from './$types';
import type { Group } from '$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.group.split('=')[1];
	const group = (await GroupModel.findOne({ group: slug })
		.select(['-_id', '-__v'])
		.lean()) as Group;
	return {
		group
	};
};