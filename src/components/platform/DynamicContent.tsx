import { FC, ReactElement, ReactNode, useContext } from "react"

import { InitialAppStateContext } from "@context"
import RoundSkeleton from "@components/skeletons/RoundSkeleton"
import TextSkeleton from "@components/skeletons/TextSkeleton"

interface DynamicContentProps {
    children: ReactNode | ReactElement | string | null | undefined
    isLoading?: boolean
    amIRequired?: boolean
    skeletonType?: 'round' | 'text'
}

const SkeletonMapper = {
    "round": RoundSkeleton,
    "text": TextSkeleton
}

const DynamicContent: FC<DynamicContentProps> = ({ children, isLoading = false, skeletonType = 'text' }) => {
    const { isAppLoading } = useContext(InitialAppStateContext)

    if (isAppLoading || isLoading) {
        const SkeletonComponent = SkeletonMapper[skeletonType];
        return <SkeletonComponent />;
    }

    return <>{children}</>;
}

export default DynamicContent