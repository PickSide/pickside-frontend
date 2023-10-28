import { useLocation } from 'react-router'

const UserDetail = () => {
	const {
		state: { user },
	} = useLocation()

	return (
		<section className="w-[1200px] h-full mx-auto flex justify-center items-center">
			{user.profilePrivacy?.showEmail && <p>{user.email}</p>}
			{user.profilePrivacy?.showGroups && user.groups?.map((group) => <p>{group.name}</p>)}
			{user.profilePrivacy?.showPhone && <p>{user.phone}</p>}
		</section>
	)
}

export default UserDetail
