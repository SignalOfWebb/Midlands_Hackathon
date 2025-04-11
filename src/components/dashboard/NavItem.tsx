'use client'

import { Flex, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { IconType } from 'react-icons'

interface NavItemProps {
  icon: IconType
  active?: boolean
  label?: string
  onClick?: () => void
  href?: string
}

export function NavItem({ icon, active = false, label, onClick, href }: NavItemProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <Flex
      as="button"
      alignItems="center"
      width="full"
      px={3}
      py={3}
      borderRadius="md"
      bg={active ? 'primary.900' : 'transparent'}
      color={active ? 'white' : 'gray.400'}
      _hover={{ 
        bg: active ? 'primary.800' : 'whiteAlpha.100', 
        color: 'white'
      }}
      transition="all 0.2s"
      onClick={handleClick}
    >
      <Icon as={icon} boxSize={5} mr={3} />
      {label && <Text fontSize="sm" fontWeight="medium">{label}</Text>}
    </Flex>
  );
} 