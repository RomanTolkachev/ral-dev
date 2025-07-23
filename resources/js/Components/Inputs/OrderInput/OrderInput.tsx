import { SVG } from '@/Components/utils/SVG';
import { CustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider';
import { motion, useAnimate } from 'motion/react';
import { FC, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
    hookFormName: string
    columnName: string
}

export const OrderInput: FC<Props> = ({ columnName, hookFormName }) => {

    const { control, trigger, getValues, setValue } = useFormContext();
    const handlers = useContext(CustomSubmitHandlerContext)
    const [scope, animate] = useAnimate()

    if (!handlers) return null
    const { customSubmitHandler } = handlers;

    return (
        <Controller
            name={hookFormName}
            control={control}
            render={({ field: { value } }) => {

                const isCurrentColumn = value?.startsWith(columnName)
                const isDesc = value?.endsWith('_desc')

                const handleToggle = async () => {
                    let newOrder

                    if (!isCurrentColumn) {
                        newOrder = `${columnName}_desc`
                    } else {
                        newOrder = isDesc ? columnName : `${columnName}_desc`
                    }

                    if (isCurrentColumn) {
                        await animate(scope.current, {
                            rotate: isDesc ? 0 : 180,
                            color: 'var(--cell-suspended)'
                        }, { duration: 0.3 })
                    } else {
                        await animate(scope.current, {
                            color: 'var(--cell-suspended)',
                            rotate: 180
                        })
                    }

                    setValue('order', newOrder, {shouldDirty: true})
                    const isValid = await trigger()
                    const formData = { ...getValues(), order: newOrder }

                    if (isValid) {
                        customSubmitHandler(formData)
                    }
                }

                return (
                    <motion.span
                        ref={scope}
                        onClick={handleToggle}
                        className="w-6 flex justify-center items-center cursor-pointer"
                        initial={{
                            rotate: isCurrentColumn ? (isDesc ? 180 : 0) : 180,
                            color: isCurrentColumn
                                ? 'var(--cell-suspended)'
                                : 'rgb(137, 137, 137)'
                        }}
                        animate={{
                            rotate: isCurrentColumn ? (isDesc ? 180 : 0) : 180,
                            color: isCurrentColumn
                                ? 'var(--cell-suspended)'
                                : 'rgb(137, 137, 137)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <SVG className="w-4" arrow />
                    </motion.span>
                )
            }}
        />
    );
};
